const download = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
        generate(reader.result);
    }
    reader.readAsDataURL(document.getElementById('file').files[0]);
}

async function generate(iconSource) {
    const mask = new Image();
    mask.src = 'mask.png';
    const icon = new Image();
    icon.src = iconSource;
    await mask.decode();
    await icon.decode();
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    context.drawImage(mask, 0, 0, size, size);
    const scale = document.getElementById('scale').value;
    const defaultIconSize = 824;
    const iconPosition = (size - scale * defaultIconSize) / 2;
    const iconSize = scale * defaultIconSize;
    context.drawImage(icon, iconPosition, iconPosition, iconSize, iconSize);
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.download = '';
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
