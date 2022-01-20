import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CircleAddIcon,
  ConsoleTabActiveIcon,
  ConsoleTabIcon,
  DatasetsTabActiveIcon,
  DatasetsTabIcon,
  InsightsTabActiveIcon,
  InsightsTabIcon,
} from '../../../../../common/images';
import Avatar from '../../../../../components/Avatar/Avatar';
import { StyledTabs } from '../../../../../components/TabPanel/StyledTabs';
import { showDialog } from '../../../../../store/global/actions';
import { discardConsole } from '../../../../../store/workspace/console/actions';
import { getDashboardItems } from '../../../../../store/workspace/insights/actions';
import {
  CONFIGURED,
  OWNER,
} from '../../../../../utils/constants/userPermissions';
import { isReadOnlyProject } from '../../../../../utils/helpers/helperFunctions';
import usePrevious from '../../../../../utils/hooks/usePrevious';
import AddCollaborator from '../AddCollaborator/AddCollaborator';
import ShareableLink from '../Insights/ShareableLink';
import useStyles from './WorkspaceBody.styles';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

const DATASETS_ROUTE =
  '/projects/[project_id]/workspace/[workspace_id]/datasets';
const CONSOLE_ROUTE = '/projects/[project_id]/workspace/[workspace_id]/console';
const INSIGHTS_ROUTE =
  '/projects/[project_id]/workspace/[workspace_id]/insights';

const structurePathNames = {
  [DATASETS_ROUTE]: 0,
  [CONSOLE_ROUTE]: 1,
  [INSIGHTS_ROUTE]: 2,
};

const structureRoutes = ['/datasets', '/console', '/insights'];

const WorkspaceBody = ({ children, className }) => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const { project } = useSelector((state) => state.cases);
  const { console, insights, workspace_solve_succeeded } = useSelector(
    (state) => state.workspace
  );
  const { list } = useSelector((state) => state.collaborators);
  const { update_dashboard_item_succeeded, pin_output_succeeded } = insights;

  const read_only = isReadOnlyProject(project);
  const insights_only = project.permission && project.permission === CONFIGURED;
  const is_case = router.query?.project_id !== undefined;
  const discard_console_succeeded = console?.discard_console_succeeded;
  const is_owner = project.permission && project.permission === OWNER;
  const prev_discard_console_succeeded = usePrevious(discard_console_succeeded);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    return router.replace(
      `/projects/${router?.query?.project_id}/workspace/${router?.query?.workspace_id}${structureRoutes[newValue]}`
    );
  };
  useEffect(() => {
    if (
      insights_only &&
      (router.pathname === DATASETS_ROUTE || router.pathname === CONSOLE_ROUTE)
    ) {
      return router.replace(
        `/projects/${router?.query?.project_id}/workspace/${router?.query?.workspace_id}/insights`
      );
    }

    if (read_only && router.pathname === CONSOLE_ROUTE) {
      return router.replace(
        `/projects/${router?.query?.project_id}/workspace/${router?.query?.workspace_id}/datasets`
      );
    }

    setValue(structurePathNames[router.pathname]);
  }, [router.pathname, insights_only, read_only]);

  useEffect(() => {
    if (
      discard_console_succeeded &&
      discard_console_succeeded !== prev_discard_console_succeeded
    ) {
      handleChange(undefined, 0);
    }
  }, [discard_console_succeeded, prev_discard_console_succeeded]);

  useEffect(() => {
    if (
      workspace_solve_succeeded ||
      update_dashboard_item_succeeded ||
      pin_output_succeeded
    ) {
      if (
        router.pathname === DATASETS_ROUTE ||
        router.pathname === INSIGHTS_ROUTE
      ) {
        dispatch(getDashboardItems());
      }
    }
  }, [
    workspace_solve_succeeded,
    update_dashboard_item_succeeded,
    pin_output_succeeded,
    router.pathname,
  ]);

  if (!is_case) return <Box className={styles.wrapper}>{children}</Box>;

  const handleAddCollaborator = () => {
    dispatch(
      showDialog({
        options: {
          title: 'Collaborate with Others',
          component: AddCollaborator,
          no_button: {
            text: 'Close',
          },
          yes_button: {
            text: 'Submit',
          },
          items_centered: true,
          fullWidth: true,
          size: 'medium',
        },
      })
    );
  };
  const handleDiscard = () => {
    dispatch(
      showDialog({
        options: {
          title: 'Discard Console',
          message: 'Do you really want to discard the console ?',
          no_button: {
            text: 'No',
          },
          yes_button: {
            text: 'Yes',
            onClick: () => dispatch(discardConsole()),
          },
        },
      })
    );
  };
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.tabsHeader}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          className={styles.tabContainer}
        >
          <Tab
            disabled={insights_only}
            label={
              <div className={styles.tabLabel}>
                <div className="in-active">
                  <Image src={DatasetsTabIcon} width={14} height={14} />
                </div>
                <div className="active">
                  <Image src={DatasetsTabActiveIcon} width={14} height={14} />
                </div>{' '}
                <Typography className={styles.tabLabelText}>
                  Data Sets
                </Typography>
              </div>
            }
            {...a11yProps(0)}
          />
          <Tab
            disabled={read_only}
            label={
              <div className={styles.tabLabel}>
                <div className="in-active">
                  <Image src={ConsoleTabIcon} width={14} height={14} />
                </div>
                <div className="active">
                  <Image src={ConsoleTabActiveIcon} width={14} height={14} />
                </div>{' '}
                <Typography className={styles.tabLabelText}>Console</Typography>
              </div>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <div className={styles.tabLabel}>
                <div className="in-active">
                  <Image src={InsightsTabIcon} width={11} height={11} />
                </div>
                <div className="active">
                  <Image src={InsightsTabActiveIcon} width={11} height={11} />
                </div>{' '}
                <Typography className={styles.tabLabelText}>
                  Insights
                </Typography>
              </div>
            }
            {...a11yProps(2)}
          />
        </StyledTabs>
        {value === 1 && (
          <Box onClick={handleDiscard} className={styles.discardConsole}>
            <Button variant="link">Discard Console</Button>
          </Box>
        )}
        {value === 2 && is_owner && (
          <ShareableLink className={styles.discardConsole} />
        )}
        {!read_only && (
          <Box className={styles.addCollaborator}>
            <Box className={styles.collaborators}>
              {list.map((user) => (
                <Avatar key={user.user_id} user={user} />
              ))}
            </Box>
            <Box
              onClick={handleAddCollaborator}
              className={styles.addCollaboratorIcon}
            >
              <Image src={CircleAddIcon} width={25} height={25} />
            </Box>
          </Box>
        )}
      </Box>

      <TabPanel
        value={value}
        index={structurePathNames[router.pathname]}
        className={className}
      >
        {children}
      </TabPanel>
    </Box>
  );
};

export default WorkspaceBody;
