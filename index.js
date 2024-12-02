import { Canvas } from 'skia-canvas';
// import { Canvas } from 'canvas';
import * as fs from 'fs';
import * as pdfjss from 'pdfjs-dist/legacy/build/pdf.js';
import { pdfDataAsBase64 } from './constants.js';
import { convertBase64ToUint8 } from './utils.js';
const pdfjs = pdfjss.default;

// run `node index.js` in the terminal

pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

// Asynchronous download of PDF
var loadingTask = pdfjs.getDocument(convertBase64ToUint8(pdfDataAsBase64));
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
      var canvas = new Canvas(2048, 2048);
      var context = canvas.getContext('2d');

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        console.log('Page rendered');

        fs.writeFileSync('FloorplanSection.png', canvas.toBuffer('png'));
      });
    });
  },
  function (reason) {
    // PDF loading error
    console.error(reason);
  }
);
