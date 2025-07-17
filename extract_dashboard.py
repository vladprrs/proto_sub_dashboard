#!/usr/bin/env python3
import json
import base64
import os
from pathlib import Path

def extract_dashboard_data():
    """Извлекает верстку и изображения из dashboard.json"""
    
    # Читаем JSON файл
    with open('dashboard.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Создаем папки для сохранения
    output_dir = Path('extracted_dashboard')
    output_dir.mkdir(exist_ok=True)
    
    images_dir = output_dir / 'images'
    images_dir.mkdir(exist_ok=True)
    
    # Извлекаем верстку
    html_content = data.get('absoluteHtml', '')
    if html_content:
        html_file = output_dir / 'dashboard.html'
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"✅ Верстка сохранена в: {html_file}")
    
    # Извлекаем изображения
    image_data = data.get('imageData', [])
    if image_data:
        print(f"📸 Найдено {len(image_data)} изображений")
        
        for i, base64_data in enumerate(image_data):
            try:
                # Декодируем base64
                image_bytes = base64.b64decode(base64_data)
                
                # Определяем формат изображения по первым байтам
                if image_bytes.startswith(b'\xff\xd8\xff'):
                    extension = 'jpg'
                elif image_bytes.startswith(b'\x89PNG\r\n\x1a\n'):
                    extension = 'png'
                elif image_bytes.startswith(b'GIF87a') or image_bytes.startswith(b'GIF89a'):
                    extension = 'gif'
                elif image_bytes.startswith(b'RIFF') and image_bytes[8:12] == b'WEBP':
                    extension = 'webp'
                else:
                    extension = 'bin'  # неизвестный формат
                
                # Сохраняем изображение
                image_filename = f"image_{i+1:03d}.{extension}"
                image_path = images_dir / image_filename
                
                with open(image_path, 'wb') as f:
                    f.write(image_bytes)
                
                print(f"  💾 {image_filename} ({len(image_bytes)} байт)")
                
            except Exception as e:
                print(f"  ❌ Ошибка при сохранении изображения {i+1}: {e}")
    
    else:
        print("⚠️  Изображения не найдены в файле")
    
    print(f"\n📁 Все файлы сохранены в папке: {output_dir.absolute()}")

if __name__ == "__main__":
    extract_dashboard_data() 