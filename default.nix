{ pkgs ? import (builtins.fetchTarball
  "https://github.com/nixos/nixpkgs-channels/archive/nixos-16.03.tar.gz") {}
, pythonPackages ? pkgs.python27Packages
}:

let self = {
  buildout = pythonPackages.zc_buildout_nix.overrideDerivation (old: {
    postInstall = "";  # Don't rename 'buildout' to 'buildout-nix'
    propagatedNativeBuildInputs = with pythonPackages; [
      lxml
      readline
      (pillow.overrideDerivation(args: {
        name = "Pillow-3.1.1";
        src = pkgs.fetchurl {
          url = "https://pypi.python.org/packages/source/P/Pillow/Pillow-3.1.1.zip";
          md5 = "3868f54fd164e65f95fbcb32f62940ae";
        };
      }))
    ];
  });
};

in pkgs.stdenv.mkDerivation rec {
  name = "env";
  buildInputs = with self; [ buildout ];
  shellHook = ''
    export SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt
    export BUILDOUT_ARGS="\
      versions:lxml= \
      versions:Pillow= \
      versions:setuptools= \
      versions:zc.buildout= \
    "
  '';
}

# ~/.zshrc:
# function nix_prompt { test $IN_NIX_SHELL && echo '[nix-shell] ' }
# ZSH_THEME_GIT_PROMPT_PREFIX="$(nix_prompt)$ZSH_THEME_GIT_PROMPT_PREFIX"
