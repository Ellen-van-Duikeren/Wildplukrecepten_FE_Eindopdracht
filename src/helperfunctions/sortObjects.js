function sortObject(list, keyName) {
    return list.sort((a, b) => {
        let fa = a.keyName,
            fb = b.keyName;

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
}

export default sortObject;