const download = () => {
    const reader = new FileReader();
    const icon = new Image();
    const defaultIconSize = 624;
    const size = 1024;
    const mask = new Image();
    mask.src = 'mask.png';
    const file = document.getElementById('file').files[0];
    reader.onloadend = () => {
        icon.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const scale = document.getElementById('scale').value;
            const context = canvas.getContext('2d');
            context.drawImage(mask, 0, 0, size, size);
            const iconPosition = (size - scale * defaultIconSize) / 2;
            const iconSize = scale * defaultIconSize;
            context.drawImage(icon, iconPosition, iconPosition, iconSize, iconSize);
            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.download = file.name;
            a.href = url;
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }
        icon.src = reader.result;
    }
    reader.readAsDataURL(file);
}
