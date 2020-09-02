// Libraries
import React, { PureComponent, FC } from 'react';
import { css, cx } from 'emotion';

// Utils & Services
import { PanelPlugin } from '@grafana/data';
import { stylesFactory, styleMixins } from '@grafana/ui';
import config from 'app/core/config';

// Types
import { PanelProps } from '@grafana/data';

export interface Props extends PanelProps {}

export class GrafanaLinksPanel extends PureComponent<Props> {
  render() {
    const styles = getStyles();

    return (
      <>
        <div className={styles.list}>
          <HomeLink title="Axinoss/GitHub" icon="fa fa-book" url="https://www.github.com/axinoss" target="_blank" />
          <HomeLink
            title="Axinoss/AWS"
            icon="fa fa-book"
            url="https://console.aws.amazon.com/billing/home?region=eu-west-1"
            target="_blank"
          />
          <HomeLink title="Axinoss/Website" icon="fa fa-book" url="https://www.axinoss.com/" target="_blank" />
        </div>
        <VersionFooter />
      </>
    );
  }
}

interface HomeLinkProps {
  title: string;
  url: string;
  target?: string;
  icon: string;
}

export const HomeLink: FC<HomeLinkProps> = ({ title, url, target, icon }) => {
  const styles = getStyles();

  return (
    <a className={styles.item} href={url} target={target}>
      <i className={cx(icon, styles.icon)} />
      {title}
    </a>
  );
};

export const VersionFooter: FC = () => {
  const styles = getStyles();
  const { version, commit } = config.buildInfo;

  return (
    <div className={styles.footer}>
      Version {version} ({commit})
    </div>
  );
};

export const getStyles = stylesFactory(() => {
  const { theme } = config;

  return {
    list: css`
      display: flex;
      flex-direction: column;
      padding: ${theme.spacing.md};
    `,
    icon: css`
      padding-right: ${theme.spacing.sm};
    `,
    footer: css`
      ${styleMixins.listItem(theme)}
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      padding: ${theme.spacing.sm};
      border-radius: 0;
      box-shadow: none;
      color: ${theme.colors.textWeak};
    `,
    item: css`
      ${styleMixins.listItem(theme)}
      padding: ${theme.spacing.sm};
      display: flex;
      margin-bottom: ${theme.spacing.xs};
      align-items: center;
    `,
  };
});

export const plugin = new PanelPlugin(GrafanaLinksPanel).setDefaults({}).setNoPadding();
