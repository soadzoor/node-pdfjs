import * as pdfjss from 'pdfjs-dist/legacy/build/pdf.js';
import { pdfUrl } from './constants.js';
const pdfjs = pdfjss.default;

// run `node index.js` in the terminal

// pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.mjs';

// Asynchronous download of PDF
var loadingTask = pdfjs.getDocument(pdfUrl);
loadingTask.promise.then(
  function (pdf) {
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function (page) {
      console.log('Page loaded');

      var viewport = page.getViewport({
        scale: 10.573110794903611,
        rotation: page.rotate,
        offsetX: -2048,
        offsetY: -5823.068030405977,
      });

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

        FileUtils.writeFile(`test.png`, canvas.toBuffer('image/png'));
      });
    });
  },
  function (reason) {
    // PDF loading error
    console.error(reason);
  }
);
