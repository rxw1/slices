import tar from 'tar-stream';
let pack = tar.pack();

export function tarSlices (sliceID, slices) {
  return function* () {
    try {

      var entry = yield pack.entry({ name: sliceID, size: 11 }, function(err) {
        pack.finalize()
      })

      yield entry.write(slices)
      yield entry.end()
      this.type = 'application/x-tar; charset=binary';


      return pack;

    } catch(err) {
      this.body = {error: err.message};
      this.status = 500;
    }
  }
}
