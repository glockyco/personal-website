{
  description = "Personal website development environment";

  inputs = {
    # Track the same nixpkgs release as the workstation. This selection lets
    # the project and the host use the same package set and binary cache.
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.2605";
  };

  outputs =
    {
      self,
      nixpkgs,
    }:
    let
      systems = [
        "aarch64-darwin"
        "x86_64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];

      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShellNoCC {
          # pnpm switches to the exact version in package.json. pnpm 10 cannot
          # switch to pnpm 12, because it skips the install script that puts
          # pnpm 12's native binary in place, and nixpkgs here stops at pnpm 11.
          packages = [
            pkgs.git-lfs
            pkgs.nodejs_24
            pkgs.pnpm_11
            pkgs.typst
          ];
        };
      });

      formatter = forAllSystems (pkgs: pkgs.nixfmt-tree);

      checks = forAllSystems (pkgs: {
        devShell = self.devShells.${pkgs.stdenv.hostPlatform.system}.default;
      });
    };
}
