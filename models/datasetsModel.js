/**
 * Created by cellis on 10/13/14.
 */

function Dataset(body) {
    this.name = body.name;
    this.year = body.year;

}

Dataset.protype.getDataset() {
    return {
        meta: Dataset.getMeta(),
        data: Dataset.getBody(),
        appspace: $set: {'apikey': Dataset.getSpace()}

    }
}