const KMeans = require('kmeans-js');

function updateDifficulty(questions, clusters) {
    const clusterCenters = clusters.map((cluster) => {
        return cluster.reduce((sum, idx) => sum + questions[idx].Accuracy, 0) / cluster.length;
      });
    
    const sortedCenters = clusterCenters.slice().sort((a, b) => a - b);
    const thresholdHigh = sortedCenters[Math.floor(sortedCenters.length * 0.75)];
    const thresholdLow = sortedCenters[Math.floor(sortedCenters.length * 0.25)];

    questions.forEach((question, idx) => {
    const accuracy = question.Accuracy;

    if (accuracy >= thresholdHigh) {
        question.Difficulty = 1;
    } else if (accuracy <= thresholdLow) {
        question.Difficulty = 3;
    } else {
        question.Difficulty = 2;
    }
    });
}

function kMeansClustering(data, k) {
    const kmeans = new KMeans({ data, k });
    kmeans.calcCentroids();
    const clusters = kmeans.getClusters();
    return clusters;
}

module.exports = {
    updateDifficulty,
    kMeansClustering,
};
