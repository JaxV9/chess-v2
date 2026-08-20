import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChessPiece, Guest } from '../models/models';

export const ChessActions = createActionGroup({
    source: 'Chess',
    events: {
        'Set Chess Pieces': props<{ pieces: ChessPiece[] }>(),
        'Sync Ws Chess Pieces': emptyProps(),

        'Create Guest': emptyProps(),
        'Load Guest': emptyProps(),
        'Set Guest': props<{ guest: Guest }>(),

        'Create Game Session': emptyProps(),
        'Set Game Session': props<{ game_session: string }>(),
        'Get Game Session': emptyProps(),
    }
});
