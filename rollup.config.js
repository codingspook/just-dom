import { terser } from "rollup-plugin-terser";

export default [
    // ESM build - bundle completo
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
    // CJS build - bundle completo
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
    // ESM build - moduli core
    {
        input: "src/modules/core/index.js",
        output: {
            file: "dist/core.esm.js",
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
    // ESM build - moduli utils
    {
        input: "src/modules/utils/index.js",
        output: {
            file: "dist/utils.esm.js",
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
];
