import * as fs from 'fs';
import { getDocument } from "pdfjs-dist/build/pdf.mjs";
import { pdfDataAsBase64 } from './constants.js';
import { convertBase64ToUint8 } from './utils.js';

// run `node index.js` in the terminal

// Asynchronous download of PDF
var loadingTask = getDocument(convertBase64ToUint8(pdfDataAsBase64));
loadingTask.promise.then(
  function (pdf) {
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function (page) {
      console.log('Page loaded');

      var viewport = page.getViewport({
        scale: 2.643277698725903, // you can increase this up to 9.48. Above 9.49, it gives blank results
        rotation: page.rotate,
        offsetX: -2048,
        offsetY: -1104.2329923985058,
      });

      // WITH THIS VIEWPORT BELOW IT GIVES BLANK RESULTS, HOWEVER, IN A WEBBROWSER, THE SAME VIEWPORT RENDERS FINE
      // var viewport = page.getViewport({
      //   scale: 10.573110794903611,
      //   rotation: page.rotate,
      //   offsetX: -2048,
      //   offsetY: -5823.068030405977,
      // });

      // Prepare canvas using PDF page dimensions

      // var canvas = createCanvas(2048, 2048);
      // var context = canvas.getContext('2d');

      const canvasFactory = pdf.canvasFactory;
      const canvasAndContext = canvasFactory.create(
        2048,
        2048
      );

      const {context} = canvasAndContext;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        console.log('Page rendered');

        fs.writeFileSync('FloorplanSection.png', canvas.toBuffer('image/png'));
      });
    });
  },
  function (reason) {
    // PDF loading error
    console.error(reason);
  }
);
