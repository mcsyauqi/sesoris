# Build Coolify untuk sesoris, menggantikan Nixpacks (2026-10-03).
# Nixpacks mengunduh nixpkgs 46 MB dari GitHub di setiap build dan sering macet dari box.
# Base image dari mirror resmi Docker Library di ECR, karena Docker Hub anonim dibatasi 10 pull per jam.
# Coolify menyisipkan ARG untuk env build-time sendiri setelah FROM.
FROM public.ecr.aws/docker/library/node:22-bookworm
WORKDIR /app
ENV CI=true
COPY . .
RUN --mount=type=cache,id=npm,target=/root/.npm npm ci --include=dev
ENV NODE_ENV=production
RUN --mount=type=cache,id=sesoris-next,target=/app/.next/cache npm run build
CMD ["npm", "run", "start"]
