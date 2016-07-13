plonetheme.webpackexample
=========================

This is an example project for the use of `plonetheme-webpack-plugin`_
in building Plone themes with Webpack.

.. _plonetheme-webpack-plugin: https://github.com/datakurre/plonetheme-webpack-plugin

.. code:: shell

   $ git clone https://github.com/datakurre/plonetheme.webpackexample
   $ cd plonetheme.webpackexample

and

.. code:: shell

   $ make

or

.. code:: shell

   $ make bin/instance
   $ bin/instance fg

   $ cd resources
   $ make watch

   $ open http://localhost:8080/Plone/  # login and enable the theme

Please, be aware that Plone must be running while running the build, because
webpack fetches all the default resources directly from a Plone site.
