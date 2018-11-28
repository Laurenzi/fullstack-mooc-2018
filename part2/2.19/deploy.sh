#!/bin/sh
npm run build
rm -rf ../../../fullstack-mooc-2018-part3/build
cp -r build ../../../fullstack-mooc-2018-part3

