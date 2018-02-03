#!/usr/bin/env bash

# Remove "test" directory if exists
rm -rf ./test/

# Install hexo-cli globally
if [[ $( sudo npm list -g hexo-cli | grep hexo-cli ) = "" ]] ; then
    sudo npm i hexo-cli -g
fi

# Make "test" directory
mkdir test

# Go to "test" directory
cd test

# Initialize npm there
npm init -y

# Install it's dependencies
npm i express --save

# Copy index-test.js as index.js file into "test" directory
cp ../index-test.js ./index.js

# Make three different blog directories
blogs=(blog1 blog2)

for blogName in ${blogs[@]} ; do
    echo ">>>> Building :: $blogName"

    # Make sub-blog sub-directory
    mkdir $blogName

    # Go to it's directory
    cd $blogName

    # Initialize a sample hexo blog in there
    hexo init

    # Uninstall hexo-server package
    npm un hexo-server --save

    # Install x-hexo-app-connect
    npm i x-hexo-app-connect --save

    # Copy index-test-blog.js as index.js file into this blog's directory
    (echo $'\'use strict\';' ; echo $'\nvar blogName = \''$blogName$'\';' ; cat ../../index-test-blogs.js) > index.js

    # Copy configs into this blog's directory
    (cat ../../_configs-sample.yml; echo $'\n  route: /'$blogName) > _config.yml

    # Go back to the test directory
    cd ../

    echo ">>>> Done Building :: $blogName"
done

# Execute the main app (which has multiple blogs)
node ./index.js