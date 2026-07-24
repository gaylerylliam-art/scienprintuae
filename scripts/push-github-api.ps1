param(
  [Parameter(Mandatory = $true)]
  [string]$Repository,

  [string]$Branch = "main",

  [string]$Message = "Publish ScienPrintUAE website"
)

$ErrorActionPreference = "Stop"

$token = $env:GITHUB_TOKEN
if (-not $token) {
  $token = $env:GH_TOKEN
}
if (-not $token) {
  throw "Set GITHUB_TOKEN or GH_TOKEN to a GitHub token with Contents read/write access."
}

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$headers = @{
  Authorization = "Bearer $token"
  Accept = "application/vnd.github+json"
  "X-GitHub-Api-Version" = "2022-11-28"
}

function Invoke-GitHub {
  param(
    [string]$Method,
    [string]$Uri,
    $Body = $null
  )

  $args = @{
    Method = $Method
    Uri = $Uri
    Headers = $headers
  }
  if ($null -ne $Body) {
    $args.ContentType = "application/json"
    $args.Body = ($Body | ConvertTo-Json -Depth 20)
  }
  try {
    Invoke-RestMethod @args
  } catch {
    $status = [int]$_.Exception.Response.StatusCode
    $message = ""
    try {
      $reader = New-Object IO.StreamReader($_.Exception.Response.GetResponseStream())
      $payload = $reader.ReadToEnd() | ConvertFrom-Json
      $message = $payload.message
    } catch {}
    throw "GitHub API $Method $Uri failed with $status $message"
  }
}

function Get-RelativePath {
  param([string]$BasePath, [string]$FullPath)
  $baseUri = [Uri]($BasePath.TrimEnd("\") + "\")
  $fullUri = [Uri]$FullPath
  [Uri]::UnescapeDataString($baseUri.MakeRelativeUri($fullUri).ToString()).Replace("\", "/")
}

$excludedDirectoryNames = @(".git", ".next", "node_modules", ".agents", ".codex", "coverage", "dist", "out")
$excludedFileNames = @(".env", ".env.local", ".env.production", ".env.development")

$files = Get-ChildItem -LiteralPath $root -Recurse -File | Where-Object {
  $relative = Get-RelativePath -BasePath $root -FullPath $_.FullName
  $segments = $relative -split "/"
  -not ($segments | Where-Object { $excludedDirectoryNames -contains $_ }) -and
  -not ($excludedFileNames -contains $_.Name) -and
  -not ($_.Name -like "*.tsbuildinfo") -and
  -not ($_.Name -like "npm-debug.log*") -and
  -not ($_.Name -like "yarn-debug.log*") -and
  -not ($_.Name -like "pnpm-debug.log*")
}

if (-not $files.Count) {
  throw "No files found to upload."
}

$repoApi = "https://api.github.com/repos/$Repository"
$branchRefUri = "$repoApi/git/ref/heads/$Branch"
$branchUpdateUri = "$repoApi/git/refs/heads/$Branch"

try {
  $ref = Invoke-GitHub -Method GET -Uri $branchRefUri
  $parentSha = $ref.object.sha
} catch {
  $status = [int]$_.Exception.Response.StatusCode
  if ($status -eq 409 -or $status -eq 404) {
    $seedContent = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("# ScienPrintUAE`n"))
    try {
      Invoke-GitHub -Method PUT -Uri "$repoApi/contents/README.md" -Body @{
        message = "Initialize repository"
        content = $seedContent
        branch = $Branch
      } | Out-Null
    } catch {
      $seedStatus = [int]$_.Exception.Response.StatusCode
      if ($seedStatus -ne 404) {
        throw
      }

      Invoke-GitHub -Method PUT -Uri "$repoApi/contents/README.md" -Body @{
        message = "Initialize repository"
        content = $seedContent
      } | Out-Null
    }
    $ref = Invoke-GitHub -Method GET -Uri $branchRefUri
    $parentSha = $ref.object.sha
  } else {
    throw
  }
}

$parentCommit = Invoke-GitHub -Method GET -Uri "$repoApi/git/commits/$parentSha"
$baseTreeSha = $parentCommit.tree.sha

$tree = @()
foreach ($file in $files) {
  $relative = Get-RelativePath -BasePath $root -FullPath $file.FullName
  Write-Host "Uploading $relative"
  $bytes = [IO.File]::ReadAllBytes($file.FullName)
  $blob = Invoke-GitHub -Method POST -Uri "$repoApi/git/blobs" -Body @{
    content = [Convert]::ToBase64String($bytes)
    encoding = "base64"
  }

  $tree += @{
    path = $relative
    mode = "100644"
    type = "blob"
    sha = $blob.sha
  }
}

$newTree = Invoke-GitHub -Method POST -Uri "$repoApi/git/trees" -Body @{
  base_tree = $baseTreeSha
  tree = $tree
}

$newCommit = Invoke-GitHub -Method POST -Uri "$repoApi/git/commits" -Body @{
  message = $Message
  tree = $newTree.sha
  parents = @($parentSha)
}

Invoke-GitHub -Method PATCH -Uri $branchUpdateUri -Body @{
  sha = $newCommit.sha
  force = $false
} | Out-Null

[pscustomobject]@{
  repository = $Repository
  branch = $Branch
  commit = $newCommit.sha
  filesUploaded = $files.Count
  url = "https://github.com/$Repository/tree/$Branch"
}
