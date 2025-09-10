{{/* Generate a full name */}}
{{- define "canary-notes-app.fullname" -}}
{{- printf "%s" .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{/* Generate a short name */}}
{{- define "canary-notes-app.name" -}}
{{- .Chart.Name -}}
{{- end }}
