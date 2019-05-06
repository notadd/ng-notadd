import {
    animate,
    keyframes,
    query,
    stagger,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';

export const notaddSpeedDialFabAnimations = [
    trigger('fabToggle', [
        state('inactive', style({
            transform: 'rotate(0deg)'
        })),
        state('active', style({
            transform: 'rotate(225deg)'
        })),
        transition('* <=> *', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('speedDialStagger', [
        transition('* => void', [
            animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                keyframes([
                    style({opacity: 1}),
                    style({opacity: 0}),
                ])
            )
        ]),
        transition('void => *', [
            animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                keyframes(
                    [
                        style({opacity: 0, transform: 'translateY(10px)'}),
                        style({opacity: 1, transform: 'translateY(0)'}),
                    ]
                )
            )
        ])
    ])
];
