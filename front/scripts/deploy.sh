#!/usr/bin/env bash

set -e

npx next build && npx next export
npx wrangler pages publish --project-name shimpeko-net out
