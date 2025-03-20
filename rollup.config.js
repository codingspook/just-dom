import { terser } from "rollup-plugin-terser";

export default [
    // ESM build
    {
        input: "src/index.js",
        output: {
            file: "dist/index.esm.js",
            format: "esm",
            sourcemap: true,
        },
        plugins: [
            terser({
                compress: {
                    pure_funcs: ["console.log"],
                },
            }),
        ],
    },
    // CJS build
    {
        input: "src/index.js",
        output: {
            file: "dist/index.js",
            format: "cjs",
            sourcemap: true,
            exports: "named",
        },
        plugins: [
            terser({
                compress: {
                    pure_funcs: ["console.log"],
                },
            }),
        ],
    },
];
