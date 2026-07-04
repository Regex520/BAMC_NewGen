import json
import random
from datetime import datetime, timedelta

def generate_weather_data():
    today = datetime.now()
    
    temp = round(random.uniform(26, 32), 1)
    humidity = random.randint(65, 95)
    wind_dirs = ['偏南风', '偏北风', '偏东风', '偏西风']
    wind_dir = random.choice(wind_dirs)
    wind_level = random.randint(1, 3)
    
    icons = ['☀️', '🌤️', '⛅', '🌦️', '🌧️', '⛈️']
    tips = ['晴到多云，天气炎热', '多云间晴，局部有短时阵雨', '多云，有（雷）阵雨', '阴天，有雷阵雨']
    
    forecast_days = []
    for i in range(7):
        date = (today + timedelta(days=i)).strftime('%m月%d日')
        icon = random.choice(icons)
        tip = random.choice(tips)
        high = random.randint(30, 35)
        low = random.randint(24, 28)
        forecast_days.append({
            'date': date,
            'icon': icon,
            'tip': tip,
            'highTemp': f'{high}℃',
            'lowTemp': f'{low}℃'
        })
    
    data = {
        "siteInfo": {
            "title": "宝安中学气象社 BAMC",
            "logoSrc": "logo.png",
            "bgSrc": "bg.jpg"
        },
        "weatherTip": {
            "buttonText": "天气提示",
            "content": "受副热带高压影响，未来几日天气炎热，最高温度可达34℃左右。请注意防暑降温。",
            "closeButtonText": "关闭提示"
        },
        "forecast": {
            "buttonText": "天气预报",
            "title": "深圳市7天天气预报",
            "releaseTime": datetime.now().strftime('%Y-%m-%d %H:%M') + ' 发布',
            "closeButtonText": "关闭预报",
            "days": forecast_days
        },
        "realtimeData": {
            "stationTitle": "宝安中学实况",
            "temperature": f'{temp}℃',
            "wind": f'{wind_dir} {wind_level} 级',
            "humidity": f'{humidity}%',
            "hourlyRain": '0mm',
            "dailyRain": f'{round(random.uniform(0, 5), 1)}mm',
            "publishTime": datetime.now().strftime('发布时间 %m-%d %H:%M')
        },
        "functionLinks": {
            "title": "其它网站",
            "links": [
                {"text": "台风风险指数（开发中）", "url": "#"},
                {"text": "中央气象台", "url": "https://www.nmc.cn"},
                {"text": "菜园子的气象栈", "url": "https://www.smca.fun"},
                {"text": "深圳市气象局（台）", "url": "https://weather.sz.gov.cn"},
                {"text": "气象社微博", "url": "https://weibo.com/u/8013139496"}
            ]
        }
    }
    
    return data

if __name__ == '__main__':
    try:
        weather_data = generate_weather_data()
        import os
        script_dir = os.path.dirname(os.path.abspath(__file__))
        output_path = os.path.join(script_dir, '..', 'public', 'weather-data.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(weather_data, f, ensure_ascii=False, indent=2)
        print('✅ weather-data.json 更新成功！')
    except Exception as e:
        print(f'❌ 更新失败: {e}')
        exit(1)
