import { english } from "./en";
import { danish } from "./da";
import { localStorageKeys } from "../stores/Settings/actionCreators";

export interface Translation {
    applicationName: string;
    continue: string;
    save: string;
    done: string;
    cancel: string;
    loading: string;
    lights: string;
    scenes: string;
    invitation: {
        invite: string;
        congratulations: string;
        xHasGrantedAccess: string;
        yourName: string;
        recipientsName: string;
        copyAndSendToX: string;
    };
    setup: {
        setup: string;
        apiKey: string;
        howToAuth: string;
        language: string;
    }
    notFound: {
        oops: string;
        thePageCouldNotBeFound: string;
        goToTheHomePage: string;
    };
}

export const getTranslation = (): Translation => {
    const localStorageLanguage = localStorage.getItem(localStorageKeys.languageKey);

    let translation: Translation | undefined = undefined;

    if (!!localStorageLanguage) {
        translation = ({
            da: danish,
            en: english
        } as any)[localStorageLanguage as any];
    }

    return translation || english;
}
