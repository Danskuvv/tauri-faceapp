type Thumb = 'Thumb_Up' | 'Thumb_Down';

type Vote = {
    faceName: string;
    vote: Thumb;
};

export type { Vote, Thumb };