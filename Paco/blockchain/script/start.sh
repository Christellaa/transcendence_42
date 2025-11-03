#!/bin/bash
set -e

avalanchego --network-id=local --http-host=0.0.0.0 &

sleep 5

bun run index.ts
