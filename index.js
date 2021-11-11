import "@tomcorp/foam2";
import "./models.js";
import express from "express";
import { fileURLToPath } from "url";

let app = express();
app.get(
  "/foam.js",
  (function () {
    var build = foam.Function.memoize(function () {
      return foam.lookup("foam.build.Builder2").create().execute();
    });

    return function (req, res, next) {
      build().then(
        function (result) {
          res.type("js").send(result);
        },
        function (e) {
          next(e);
        }
      );
    };
  })()
);

app.get(/\/kevin-[0-9]{2}.png/, function (req, res) {
  res.sendFile(
    fileURLToPath(new URL(`assets/${req.path.substring(1)}`, import.meta.url))
  );
});

let INDEX = `<!DOCTYPE html>
  <html>
      <head>
          <title>Kevin Greer as a Service</title>
          <script src="foam.js"></script>
          <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
          <foam class="KGAAS"></foam>
      </body>
  </html>
  `;

app.get("/", function (req, res) {
  res.send(INDEX);
});

app.listen(8989);
