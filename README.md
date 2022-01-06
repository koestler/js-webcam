# js-webcam
[![Docker Image CI](https://github.com/koestler/js-webcam/actions/workflows/docker-image.yml/badge.svg)](https://github.com/koestler/js-webcam/actions/workflows/docker-image.yml)

This is a simple frontend for [github.com/koestler/go-webcam](https://github.com/koestler/go-webcam).
See it's [README](https://github.com/koestler/go-webcam#readme) for more details.

## Creating a production build
This build does contain a scratch container with only the static build in /frontend-build. It is meant to be used in the go-webcam production build.
```
docker build -f docker/Dockerfile -t koestler/js-webcam .
docker push koestler/js-webcam
```

## Available Scripts
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.

### `npm run build`
Builds the app for production to the `build` folder.\

### `npm run extract`
Extract newly added translation into the po files.

### `npm run compile`
Compilies to po (translation) files into javascript code. Is run automatically
whenever `npm run build` is run.