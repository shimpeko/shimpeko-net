#!/usr/bin/env bash

npx next build && npx next export
npx wrangler pages publish --project-name shimpeko-net out
