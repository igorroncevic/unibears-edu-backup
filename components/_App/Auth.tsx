import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAuth, getCourse } from '../../redux/selectors';
import { PATH_NAMES } from '../../utils/routing';
import { toastErrorImportant } from '../../utils/toasts';
import Preloader from './Preloader';

export interface AuthProp {
    requiredCollectionItems: number;
}

interface AuthProps {
    auth: AuthProp;
    children: JSX.Element;
}

function Auth({ children, auth }: AuthProps) {
    const [t] = useTranslation('toasts');
    const router = useRouter();
    const { isReady } = router;
    const { collectionItemsCount } = useSelector(getAuth);
    const { lastVisitedCourse } = useSelector(getCourse);
    const { requiredCollectionItems } = auth;

    const doesNotHaveEnoughCollectionItems =
        collectionItemsCount < requiredCollectionItems;

    useEffect(() => {
        if (isReady && doesNotHaveEnoughCollectionItems) {
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
    }, [isReady, router]);

    if (!router.isReady) {
        return <Preloader />;
    }

    return children;
}

export default Auth;
