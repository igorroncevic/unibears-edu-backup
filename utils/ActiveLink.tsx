import Link from 'next/link';
import { withRouter } from 'next/router';
import { Children, cloneElement } from 'react';

function ActiveLink({ router, children, ...props }: any) {
    const child = Children.only(children);

    let className = child.props.className || '';
    if (router.pathname === props.href && props.activeClassName) {
        className = `${className} ${props.activeClassName}`.trim();
    }

    // eslint-disable-next-line no-param-reassign
    delete props.activeClassName;

    return <Link {...props}>{cloneElement(child, { className })}</Link>;
}

export default withRouter(ActiveLink);
