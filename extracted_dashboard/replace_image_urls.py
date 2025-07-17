#!/usr/bin/env python3
import re
import os
from pathlib import Path

def replace_image_urls():
    """Заменяет ссылки на builder.io на локальные пути к изображениям"""
    
    # Читаем HTML файл
    html_file = Path('dashboard.html')
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Создаем словарь соответствий URL -> локальный файл
    url_mapping = {
        'https://api.builder.io/api/v1/image/assets/TEMP/0235e2ec7b64e89803c2ebe320dbddf014cebf7a?width=48': 'images/0235e2ec7b64e89803c2ebe320dbddf014cebf7a.jpg',
        'https://api.builder.io/api/v1/image/assets/TEMP/15fcb5df22f040135b4b4a6c11ee1f9feba9623b?width=276': 'images/15fcb5df22f040135b4b4a6c11ee1f9feba9623b.jpg',
        'https://api.builder.io/api/v1/image/assets/TEMP/1787ae2a5cea9bf92b50b8f4cc908087feab9732?width=640': 'images/1787ae2a5cea9bf92b50b8f4cc908087feab9732.jpg',
        'https://api.builder.io/api/v1/image/assets/TEMP/34f67ee241b18699fd7e3f7d00e2b36780572204?width=192': 'images/34f67ee241b18699fd7e3f7d00e2b36780572204.jpg',
        'https://api.builder.io/api/v1/image/assets/TEMP/3a11f310b9b132d5ce81bd19443d7d5fa0f543f7?width=192': 'images/3a11f310b9b132d5ce81bd19443d7d5fa0f543f7.jpg',
        'https://api.builder.io/api/v1/image/assets/TEMP/40ceba486b7ff03fe9915708b46fafaa10915184?width=192': 'images/40ceba486b7ff03fe9915708b46fafaa10915184.jpg',
        'https://api.builder.io/api/v1/image/assets/TEMP/43a5d11314e51c5e42d4fedd343dae47d45a3819?width=320': 'images/43a5d11314e51c5e42d4fedd343dae47d45a3819.jpg',
        'https://api.builder.io/api/v1/image/assets/TEMP/98cd36dcaa1ee846e21b0541c98a5464f27889d8?width=96': 'images/98cd36dcaa1ee846e21b0541c98a5464f27889d8.jpg',
        'https://api.builder.io/api/v1/image/assets/TEMP/e42877ade1f2bd4cfde7c0b41fad26ebdad2f46e?width=192': 'images/e42877ade1f2bd4cfde7c0b41fad26ebdad2f46e.jpg'
    }
    
    # Заменяем все ссылки
    replaced_count = 0
    for old_url, new_path in url_mapping.items():
        if old_url in content:
            content = content.replace(old_url, new_path)
            replaced_count += 1
            print(f"✅ Заменено: {old_url} -> {new_path}")
    
    # Сохраняем обновленный HTML
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n📝 Заменено {replaced_count} ссылок на изображения")
    print(f"💾 Обновленный файл сохранен: {html_file}")

if __name__ == "__main__":
    replace_image_urls() 