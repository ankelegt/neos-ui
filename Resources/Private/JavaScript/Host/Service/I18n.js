function formatIdentifier(identifier) {
    return identifier.replace('.', '_');
}
export default translations => {

    return (transUnitId, packageKey = 'TYPO3.Neos', sourceName = 'Main', params = []) => {
        transUnitId = formatIdentifier(transUnitId)
        packageKey = formatIdentifier(packageKey);
        sourceName = formatIdentifier(sourceName);

        return [packageKey, sourceName, transUnitId].reduce((prev, cur) => {
            return prev ? prev[cur] || '' : '';
        }, translations);
    };
}
