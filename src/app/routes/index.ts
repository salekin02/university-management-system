import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/semester.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/semesters',
        route: SemesterRoutes
    }
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})

// router.use('/users', UserRoutes)
// router.use('/semesters', SemesterRoutes)



export default router;