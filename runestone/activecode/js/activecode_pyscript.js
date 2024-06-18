import { ActiveCode } from "./activecode.js";

export default class PyScriptActiveCode extends ActiveCode {
    constructor(opts) {
        super(opts);
        this.output_height = $(opts.orig).data("output_height") || "400px";
        $(this.runButton).text("Run PyScript");
        this.editor.setValue(this.code);
    }

    async runProg() {
        var prog = await this.buildProg(true);
        this.saveCode = await this.manage_scrubber("True");
        $(this.output).text("");
        $(this.outDiv).show({ duration: 700, queue: false });

        const pyscriptHTML = `
        <html>
        <head>
            <meta charset="utf-8" />
            <link rel="stylesheet" href="https://pyscript.net/latest/pyscript.css" />
            <script defer src="https://pyscript.net/latest/pyscript.js"></script>
            <style>
                .py-repl-run-button {
                    opacity: 1;
                }
                #replOutput {
                    padding: 20px;
                    margin-top: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #fff;
                }
            </style>
        </head>
        <body>
            <py-config>
                packages = ["numpy", "pandas", "matplotlib"]
                terminal = false
            </py-config>
            <py-repl output="replOutput">
                ${prog}
            </py-repl>
            <div id="replOutput"></div>
        </body>
        </html>
        `;

        this.output.srcdoc = pyscriptHTML;
    }

    createOutput() {
        var outDiv = document.createElement("div");
        $(outDiv).addClass("ac_output col-md-12");

        this.outDiv = outDiv;
        this.output = document.createElement("iframe");
        $(this.output).css({
            "background-color": "white",
            "position": "relative",
            "height": this.output_height,
            "width": "100%"
        });

        outDiv.appendChild(this.output);
        this.outerDiv.appendChild(outDiv);

        var clearDiv = document.createElement("div");
        $(clearDiv).css("clear", "both");
        this.outerDiv.appendChild(clearDiv);
    }

    enableSaveLoad() {
        $(this.runButton).text("Run PyScript");
    }
}
