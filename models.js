foam.CLASS({
  name: "KGAAS",
  extends: "foam.u2.Controller",
  requires: ["foam.u2.view.TextField"],
  constants: [
    {
      name: "quotes",
      value: [
        "And why is that?",
        "And why do you care?",
        "Can you decorate it?",
        "Can you compose it?",
      ],
    },
  ],
  properties: [
    "transcriptE",
    {
      class: "StringProperty",
      name: "input",
      view: { class: "foam.u2.tag.Input" },
      postSet: function (_, v) {
        if (v) {
          this.ask();
        }
      },
    },
  ],
  css: `
  ^ {
    font: sans-serif;
  }

  ^transcript {
    max-width: 600px;
  }

  ^question {
    max-width: 300px;
    margin: 12px 32px 12px 12px;
    border: 1px solid;
    border-top-color: #f9f9f9;
    border-left-color: #f9f9f9;
    border-bottom-color: #e0e0e0;
    border-right-color: #e0e0e0;
    background: #eeeeee;
    border-radius: 4px;
  }

  ^reply {
    max-width: 300px;
    text-align: right;
    margin-left: 32px;
    border-radius: 4px;
    background: #eef;
    border: 1px solid;
    border-top-color: #f9f9ff;
    border-left-color: #f9f9ff;
    border-bottom-color: #e0e0e0;
    border-right-color: #e0e0e0;
  }

  ^input {
    display: block;
    width: min(100vw - 32px, 300px);
  }

  ^avatar {
    width: 256px;
    height: 256px;
    object-fit: contain;
  }

  `,
  methods: [
    function reply() {
      this.kevinSay(
        /^thanks/i.test(this.input)
          ? "No problem."
          : this.QUOTES[Math.floor(Math.random() * this.QUOTES.length)]
      );
    },
    function kevinSay(msg) {
      let image = 1 + Math.floor(Math.random() * 6);
      this.transcriptE.add(
        this.E("div")
          .addClass(this.myClass("reply"))
          .start("div")
          .start("img")
          .addClass(this.myClass("avatar"))
          .attrs({
            src: `/kevin-${image.toString().padStart(2, "0")}.png`,
          })
          .end("img")
          .end("div")
          .add(msg)
      );
    },
    function initE() {
      let view = this;
      this.addClass(this.myClass())
        .start("div", null, this.transcriptE$)
        .addClass(this.myClass("transcript"))
        .end()
        .start(this.INPUT)
        .addClass(this.myClass("input"))
        .call(function () {
          //this.sub('commit', view.ask);
        })
        .end();

      this.kevinSay("What can I help you with?");
    },
  ],
  listeners: [
    function ask() {
      this.transcriptE.add(
        this.E("div").addClass(this.myClass("question")).add(this.input)
      );
      this.transcriptE.add(this.reply());
      this.input = "";
    },
  ],
});
