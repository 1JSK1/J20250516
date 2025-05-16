document.addEventListener('DOMContentLoaded', function() {
    // 心情追踪器功能
    const moodButtons = document.querySelectorAll('.mood');
    const moodMessage = document.getElementById('mood-message');
    const moodMessages = {
        'happy': '很高兴你今天心情不错！保持这份好心情，继续加油！',
        'tired': '工作疲惫是正常的，记得给自己一些休息的时间。今晚早点睡，明天会更好！',
        'stressed': '压力之下，别忘了深呼吸。没关系的，一切都会过去。你比想象中更坚强！',
        'sad': '每个人都有情绪低落的时候，允许自己难过，但别忘了明天太阳依然会升起。',
        'motivated': '这种动力真棒！趁热打铁，相信你今天一定能有不错的收获！'
    };

    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除其他按钮的选中状态
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            // 添加当前按钮的选中状态
            this.classList.add('selected');
            
            const mood = this.getAttribute('data-mood');
            moodMessage.textContent = moodMessages[mood];
            moodMessage.classList.remove('hidden');
            
            // 保存心情到本地存储
            localStorage.setItem('lastMood', mood);
            localStorage.setItem('lastMoodDate', new Date().toDateString());
        });
    });

    // 检查是否有之前保存的心情
    const lastMood = localStorage.getItem('lastMood');
    const lastMoodDate = localStorage.getItem('lastMoodDate');
    const today = new Date().toDateString();
    
    if (lastMood && lastMoodDate === today) {
        const selectedButton = document.querySelector(`.mood[data-mood="${lastMood}"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
            moodMessage.textContent = moodMessages[lastMood];
            moodMessage.classList.remove('hidden');
        }
    }

    // 励志语录功能
    const quoteElement = document.getElementById('quote');
    const newQuoteButton = document.getElementById('new-quote');
    
    const quotes = [
        "每一次努力都是成长，每一次坚持都是收获。",
        "你的价值不取决于别人的评价，而在于你自己的坚持与成长。",
        "生活不会因为你的疲惫而停下脚步，但你可以选择偶尔停下来休息。",
        "成功不是终点，失败也不是终结，勇气才是继续前行的动力。",
        "不要因为别人的否定而质疑自己的价值，你比想象中更加优秀。",
        "职场如人生，起起落落都是风景，重要的是保持前进的方向。",
        "今天的坚持，是为了明天更好的自己。",
        "你所经历的每一个困难，都是为了遇见更好的自己。",
        "不要害怕犯错，害怕犯错的人，往往错过更多机会。",
        "温柔待人，坚强自持，愿你在职场中保持初心。"
    ];
    
    newQuoteButton.addEventListener('click', function() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (quotes[randomIndex] === quoteElement.textContent && quotes.length > 1);
        
        quoteElement.textContent = quotes[randomIndex];
    });

    // 呼吸练习动画
    const startBreathingButton = document.getElementById('start-breathing');
    const circle = document.querySelector('.circle');
    const breathingText = document.querySelector('.breathing-text');
    let isBreathing = false;
    let breathingInterval;

    startBreathingButton.addEventListener('click', function() {
        if (!isBreathing) {
            // 开始呼吸练习
            isBreathing = true;
            startBreathingButton.textContent = '停止';
            circle.classList.add('animate');
            
            let phase = 'inhale';
            breathingText.textContent = '吸气...';
            
            breathingInterval = setInterval(function() {
                if (phase === 'inhale') {
                    phase = 'exhale';
                    breathingText.textContent = '呼气...';
                } else {
                    phase = 'inhale';
                    breathingText.textContent = '吸气...';
                }
            }, 4000);
            
            // 30秒后自动停止
            setTimeout(function() {
                if (isBreathing) {
                    stopBreathing();
                }
            }, 30000);
        } else {
            stopBreathing();
        }
    });

    function stopBreathing() {
        isBreathing = false;
        startBreathingButton.textContent = '开始';
        circle.classList.remove('animate');
        breathingText.textContent = '吸气...';
        clearInterval(breathingInterval);
    }

    // 保存个人笔记功能
    const selfNoteTextarea = document.getElementById('self-note');
    const saveNoteButton = document.getElementById('save-note');
    const savedMessage = document.getElementById('saved-message');

    // 加载保存的笔记
    const savedNote = localStorage.getItem('selfNote');
    if (savedNote) {
        selfNoteTextarea.value = savedNote;
    }

    saveNoteButton.addEventListener('click', function() {
        const note = selfNoteTextarea.value;
        localStorage.setItem('selfNote', note);
        
        savedMessage.classList.remove('hidden');
        setTimeout(function() {
            savedMessage.classList.add('hidden');
        }, 3000);
    });
});