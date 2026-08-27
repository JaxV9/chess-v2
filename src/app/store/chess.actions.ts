import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChessPiece, Guest } from '../models/models';

export const ChessActions = createActionGroup({
    source: 'Chess',
    events: {
        'Set Chess Pieces': props<{ pieces: ChessPiece[] }>(),
        'Sync Ws Chess Pieces': props<{ gameSessionId: string }>(),
        'Ws Connection Error': emptyProps(),

        'Create Guest': emptyProps(),
        'Create Guest Success': emptyProps(),
        'Create Guest Failure': emptyProps(),

        'Load Guest': emptyProps(),

        'Load Infos': emptyProps(),
        'Load Infos Error': emptyProps(),

        'Set Guest': props<{ guest: Guest }>(),

        'Set Infos': props<{ game_session: string }>(),

        'Remove Guest From Store': emptyProps(),
        'Disconnect Guest': emptyProps(),


        'Create Game Session': emptyProps(),
        'Create Game Session Failure': emptyProps(),
        'Set Game Session': props<{ game_session: string }>(),
        'Get Game Session': emptyProps(),

        'Start Game': emptyProps(),
        'Pause Game': emptyProps(),
    }
});
