import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import Preloader from './Preloader';
import { toastErrorImportant } from '../../utils/toasts';
import { AppState } from '../../redux/reducers/reducers';
import { PATH_NAMES } from '../../utils/routing';

interface AuthProp {
    requiredCollectionItems: number;
}

interface AuthProps {
    auth: AuthProp;
    children: JSX.Element;
}

const Auth = ({ children, auth }: AuthProps) => {
    const [t] = useTranslation('toasts');
    const router = useRouter();
    const { isReady } = router;
    const { collectionItemsCount } = useSelector(
        (state: AppState) => state.auth
    );
    const { lastVisitedCourse } = useSelector(
        (state: AppState) => state.course
    );
    const { requiredCollectionItems } = auth;

    useEffect(() => {
        if (isReady && collectionItemsCount < requiredCollectionItems) {
            toastErrorImportant(t('error.notEnoughCollectionItems'));
            if (lastVisitedCourse) {
                router.push(
                    PATH_NAMES.CoursesId,
                    PATH_NAMES.CoursesIdFilled(lastVisitedCourse)
                );
            } else {
                router.push(PATH_NAMES.CoursesIndex);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isReady,
        collectionItemsCount,
        requiredCollectionItems,
        lastVisitedCourse,
    ]);

    if (!router.isReady) {
        return <Preloader />;
    }

    return children;
};

export default Auth;
