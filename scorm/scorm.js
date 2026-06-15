var scorm = pipwerks.SCORM;
var lmsConnected = false;
var studentName = "";

function connectLMS() {
    lmsConnected = scorm.init();

    // Если init не прошёл, но API LMS всё-таки есть в родительском окне —
    // значит сессию уже открыла предыдущая страница. Переиспользуем её,
    // а не пытаемся инициализировать второй раз (LMS это запрещает).
    if (!lmsConnected && scorm.API.getHandle()) {
        scorm.connection.isActive = true;
        lmsConnected = true;
    }

    return lmsConnected;
}

function initCourse() {
    connectLMS();

    if (lmsConnected) {
        var currentStatus = scorm.get("cmi.core.lesson_status");
        if (currentStatus === "not attempted" || currentStatus === "unknown") {
            scorm.set("cmi.core.lesson_status", "incomplete");
            scorm.save();
        }

        studentName = scorm.get("cmi.core.student_name");
    }

    var greeting = document.getElementById('greeting');
    if (greeting) {
        greeting.textContent = (lmsConnected && studentName)
            ? `Здравствуйте ${studentName}!`
            : `Здравствуйте пользователь!`;
    }
}

window.onload = function () {
    initCourse();
};