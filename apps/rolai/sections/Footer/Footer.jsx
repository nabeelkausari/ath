import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import logo from '../../assets/images/Logo@2x.png';
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  UpArrowIcon,
  YoutubeIcon,
} from '../../common/images';
import useStyles from './Footer.styles';
// eslint-disable-next-line react/display-name
const Logo = React.forwardRef(({ href, onClick }, ref) => {
  return (
    <a onClick={onClick} href={href} ref={ref}>
      <Image width="96px" height="27px" src={logo} alt="Rolai Education" />
    </a>
  );
});
const Footer = ({ executeScroll, ...props }) => {
  const styles = useStyles();

  return (
    <Container fixed disableGutters={true} maxWidth="md">
      <Box className={styles.footer}>
        <Typography component="div">
          <Box className={styles.socialMediaSection}>
            <Link href="/" passHref>
              <Logo />
            </Link>
            <Box className={styles.socialMediaFooterIcons}>
              <Typography component="div" className={styles.socialIcons}>
                <Link href="/">
                  <Image src={FacebookIcon} width={15} height={12} />
                </Link>
              </Typography>
              <Typography component="div" className={styles.socialIcons}>
                <Link href="/">
                  <Image src={YoutubeIcon} width={15} height={12} />
                </Link>
              </Typography>
              <Typography component="div" className={styles.socialIcons}>
                <Link href="/">
                  <Image src={TwitterIcon} width={15} height={12} />
                </Link>
              </Typography>
              <Typography component="div" className={styles.socialIcons}>
                <Link href="/">
                  <Image src={LinkedinIcon} width={15} height={12} />
                </Link>
              </Typography>
            </Box>
          </Box>
        </Typography>
        <Typography
          component="div"
          className={styles.footerDetails}
          color="textSecondary"
        >
          <Box className={styles.footerDetailsLink}>
            <Typography className={styles.footerLinks} component="div">
              <Typography className={styles.links} variant="caption">
                About Us
                {/*<Link href="/">About Us</Link>*/}
              </Typography>
              <Typography className={styles.links} variant="caption">
                Courses
                {/*<Link href="/">Courses</Link>*/}
              </Typography>
            </Typography>
            <Typography className={styles.footerLinks} component="div">
              <Typography className={styles.links} variant="caption">
                Partners
                {/*<Link href="/">Partners</Link>*/}
              </Typography>
              <Typography className={styles.links} variant="caption">
                Blogs
                {/*<Link href="/">Blogs</Link>*/}
              </Typography>
            </Typography>
            <Typography className={styles.footerLinks} component="div">
              <Typography className={styles.links} variant="caption">
                Privacy Policy
                {/*<Link href="/">Privacy Policy</Link>*/}
              </Typography>
              <Typography className={styles.links} variant="caption">
                Terms & Conditions
                {/*<Link href="/">Terms & Conditions</Link>*/}
              </Typography>
            </Typography>
            <Typography className={styles.footerLinks} component="div">
              <Typography className={styles.links} variant="caption">
                Contact Us
                {/*<Link href="/">Contact Us</Link>*/}
              </Typography>
              <Typography className={styles.links} variant="caption">
                FAQs
                {/*<Link href="/">FAQs</Link>*/}
              </Typography>
            </Typography>
          </Box>
          <Box className={styles.copyRight}>
            <Typography variant="caption">
              © 2021 Rolai Inc. All rights reserved
            </Typography>
          </Box>
        </Typography>
        <Typography variant="caption">
          <Button
            onClick={executeScroll}
            variant="outlined"
            className={styles.scrollTopButton}
          >
            <Image src={UpArrowIcon} width={16} height={18} />
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
