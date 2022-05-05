#Admin API

/admin/login +
/admin/auth +
/admin/olymp/create +
/admin/olymps +
/admin/olymp/settask +
/admin/olymp/tasks +
/admin/olymp/task/settest +

/admin/olymp/start (returns time in seconds)
/admin/olymp/status (returns seconds if starts, or return status = not started)
/admin/olymp/end

#User API
/user/register
/user/login
/user/auth
/user/olymps
/user/olymp/status
/user/olymp/tasks
/user/olymp/task/push (needs olympid and taskid )
/user/olymp/task/status (returns true and score if task solve, false and score if task not solved)

```js
fetch('http://localhost:7000/api/admin/olymps', {
  method: "get",
  headers: {
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${admintoken}`
  },
}).then((response) => {
  return response.json()
}).then((result) => {
  let olymps = document.getElementById('olymps');
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
```