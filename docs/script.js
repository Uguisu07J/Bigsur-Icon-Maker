const download = () => {
    const file = document.getElementById('file').files[0];
    if (file == null) {
        alert('No file selected.');
        return;
    } else if (document.getElementById('scale').validity.badInput) {
        alert('The scale is invalid.');
        return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
        generate(reader.result);
    }
    reader.readAsDataURL(file);
}

async function generate(iconSource) {
    const template = new Image();
    template.src = 'template.png';
    const icon = new Image();
    icon.src = iconSource;
    await template.decode();
    await icon.decode();
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    context.drawImage(template, 0, 0, size, size);
    const scale = document.getElementById('scale').valueAsNumber;
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
