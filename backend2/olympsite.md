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

165152092330
1651520923