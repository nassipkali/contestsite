var mainNode = document.getElementById('container');
let olympTemplate = document.getElementById('olymp-template');
let tasksListTemplate = document.getElementById('tasks-template');
let tasksList = tasksListTemplate.content.cloneNode(true);
let olympsList = document.getElementById('olymps-list');
let taskTemplate = document.getElementById('task-template');

let taskEnterTemplate = document.getElementById('task-enter-template');
let taskEnter = taskEnterTemplate.content.cloneNode(true);

let olympsCount = 0;
let olympsStore = {};
let olympid = 0;

let tasksCount = 0;
let tasksStore = {};

let taskid = 0;

let codeLang = 'py';

function enterOlymp(olymp) {
  olympid = olymp;
  olympname = olympsStore[olympid];
  mainNode.removeChild(olympsList);
  mainNode.appendChild(tasksList);
  let olympNameHeader = document.getElementById('olymp-name');
  olympNameHeader.innerText = `Олимпиада ${olympname}`;
  fetch('http://olymps.kz/api/user/olymp/status', {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify({"olympid": olympid})
  }).then((response) => {
    return response.json()
  }).then((result) => {
    let status = result.status;
    let olympStatus = document.getElementById('olymp-status');
    if(status === "not started") {
      olympStatus.innerText = 'Статус: не началось';
    }
    else if(status === "expired") {
      olympStatus.innerText = 'Статус: закончилось';
    }
    else if(status === "started") {
      olympStatus.innerText = 'Статус: начато';
    }
  });

  // Tasks
  fetch('http://olymps.kz/api/admin/olymp/tasks', {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify({"olympid": olympid})
  }).then((response) => {
    return response.json()
  }).then((result) => {
    let tasks = document.getElementById('tasks');
    console.log(result);
    for(index = 0; index < result.length; index++) {
      let task = result[index];
      tasksStore[task.id] = task.title; 
      let elem = document.createElement('div');  
      elem.append(taskTemplate.content.cloneNode(true));
      let taskid = `task-${task.id}`;
      let cdbtn = elem.getElementsByClassName('btn')[0];
      cdbtn.innerText = task.title;
      cdbtn.setAttribute('onClick', `enterTask(${task.id})`);
      elem.id = taskid;
      tasks.appendChild(elem);
      tasksCount++;
    }
  });
 
}

let editor = null

function enterTask(task) {
  taskid = task;
  let taskname = tasksStore[taskid];
  tasksListElement = document.getElementById('tasks-list');
  mainNode.removeChild(tasksListElement);
  mainNode.appendChild(taskEnter);
  let taskName = document.getElementById('task-name');
  taskName.innerText = `Задача ${taskname}`;
  editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: "python",
    lineNumbers: true,
    theme: "dracula",
    tabSize: 4,
    indentUnit: 4
  });
  editor.save()
}

function changeLang(lang) {
  codeLang = lang;
  let langButton = document.getElementById('langButton');
  if(lang === 'py') {
    editor.setOption('mode', 'python');
    langButton.innerText = 'Python';
  }
  else if(lang === 'cpp') {
    editor.setOption('mode', 'text/x-c++src');
    langButton.innerText = 'C++';
  }
  else if(lang === 'cs') {
    editor.setOption('mode', 'text/x-csharp');
    langButton.innerText = 'C#';
  }
}

function sendCode() {
  let code = editor.getValue();
  fetch('http://olymps.kz/api/user/olymp/task/push', {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify({
      "olympid": olympid,
      "taskid": taskid,
      "code": code,
      "language": codeLang
    })
  }).then((response) => {
    return response.json();
  }).then((result) => {
    let res = result.result;
    let max = result.max;
    if(res === max) {
      taskMsg = document.getElementById('taskEnterMessage');
      taskMsg.classList.add("alert-success");
      taskMsg.innerText = `Задача выполнена. Баллы: ${res}/${max}`;
    }
    else {
      taskMsg = document.getElementById('taskEnterMessage');
      taskMsg.classList.add("alert-danger");
      taskMsg.innerText = `Задача не выполнена. Баллы: ${res}/${max}`;
    }
  });
}

let token = localStorage.getItem('token');
if(token) {
  fetch('http://olymps.kz/api/user/auth', {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
  })
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if(result.name) {
      let lbtn = document.getElementById("logbtn");
      lbtn.classList.add("d-none");
      let rbtn = document.getElementById("regbtn");
      rbtn.classList.add("d-none");
      let rcorner = document.getElementById("right-corner");
      const newContent = document.createTextNode(result.name);
      rcorner.appendChild(newContent);
      fetch('http://olymps.kz/api/user/olymps', {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        },
      }).then((response) => {
        return response.json();
      }).then((result) => {
        let olymps = document.getElementById('olymps');
        console.log(result);
        for(index = 0; index < result.length; index++) {
          let olymp = result[index];
          olympsStore[olymp.id] = olymp.name; 
          let elem = document.createElement('div');  
          elem.append(olympTemplate.content.cloneNode(true));
          let olympid = `olymp-${olymp.id}`;
          let cdbtn = elem.getElementsByClassName('btn')[0];
          cdbtn.innerText = olymp.name;
          cdbtn.setAttribute('onClick', `enterOlymp(${olymp.id})`);
          elem.id = olympid;
          olymps.appendChild(elem);
          olympsCount++;
        }
      }) 
    }
  })
}

let logbtn = document.getElementById("log-button");
logbtn.addEventListener('click', event => {
  loginput = document.getElementById("loginInput");
  logpas = document.getElementById("loginPassword");
  let logdata = new Object();
  logdata.email = loginput.value;
  logdata.password = logpas.value;
  let loginJSON = JSON.stringify(logdata);
  fetch('http://olymps.kz/api/user/login', {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: loginJSON
  })
  .then((response) => { 
    return response.json()
  }) //2
  .then((result) => {
    if(result.message) {
      let logmsg = document.getElementById("loginMessage")
      logmsg.innerText = result.message
      modal.hide();
    }
    else {
      if(result.token) {
        localStorage.setItem('token', result.token);
        console.log('nice')
        let logmsg = document.getElementById("loginMessage")
        logmsg.innerText = ''
        var myModalEl = document.getElementById('loginModal');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
      }
    }
  });
});

let regbtn = document.getElementById("reg-button");
regbtn.addEventListener('click', event => {
  reginput = document.getElementById("registerInput");
  regpas = document.getElementById("registerPassword");
  regname = document.getElementById("registerName");
  
  fetch('http://olymps.kz/api/user/register', {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": reginput.value,
      "password": regpas.value,
      "name": regname.value
    })
  })
  .then((response) => { 
    return response.json()
  }) //2
  .then((result) => {
    if(result.message) {
      let regmsg = document.getElementById("registerMessage")
      regmsg.innerText = result.message
    }
    else {
      if(result.token) {
        localStorage.setItem('token', result.token);
        console.log('nice')
        let regmsg = document.getElementById("registerMessage")
        regmsg.innerText = ''
        var myModalEl = document.getElementById('registerModal');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
      }
    }
  });
});