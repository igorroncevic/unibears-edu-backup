import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { PathNames } from '@/utils/routing';

const Custom404 = () => {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push(PathNames.Index);
        }, 10 * 1000);

        return () => clearTimeout(timer); 
    }, [])

    return (
        <div className="error-area">
            <div className="d-table">
                <div className="d-table-cell">
                    <div className="container">
                        <div className="error-content">
                            <img src="/images/error.png" alt="image" />
                            <h3>Error 404 : Page Not Found</h3>
                            <p>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                            <p>You will be redirected to the home page shortly.</p>

                            <div className="btn-box">
                                <Link href={PathNames.CoursesIndex}>
                                    <a className="default-btn">
                                        <i className="flaticon-history"></i> Go Back <span></span>
                                    </a>
                                </Link>
                                <Link href={PathNames.CoursesIndex}>
                                    <a className="default-btn">
                                        <i className="flaticon-home"></i> Homepage <span></span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Custom404;