plonetheme.webpackexample
=========================

This is an example project about the usage of `plonetheme-webpack-plugin`_
in building Plone themes with Webpack.

.. _plonetheme-webpack-plugin: https://github.com/datakurre/plonetheme-webpack-plugin

Clone the project:

.. code:: shell

   $ git clone https://github.com/datakurre/plonetheme.webpackexample
   $ cd plonetheme.webpackexample

Start Plone and webpack-dev-server:

.. code:: shell

   $ make watch

An example Plone site with hot-reloaded theme should be now available
at http://localhost:8080/Plone/ (at first, the theme must be manually
enabled from the configuration panel).

Production theme is built with:

.. code:: shell

   $ make

Please, note that Plone must be running while running the build, because
webpack fetches all the default resources directly from a Plone site.
