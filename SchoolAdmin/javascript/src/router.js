import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import RegisterController from './controllers/RegisterController';
import WorkloadReportController from './controllers/WorkloadReportController';
const router = Express.Router();

router.use('/', HealthcheckController);
router.use('/', RegisterController);
router.use('/', WorkloadReportController);

export default router;
