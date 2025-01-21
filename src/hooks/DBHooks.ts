import { useEffect, useState } from "react";
import Loki from 'lokijs';
import { Vote } from "@/types/localTypes";

const useDB = () => {
    const [db, setDb] = useState<Loki | null>(null);
    const [faceCollection, setFaceCollection] = useState<Loki.Collection<Float32Array> | null>(null);
    const [voteCollection, setVoteCollection] = useState<Loki.Collection<Vote> | null>(null);

    useEffect(() => {
        try {
            const dbInstance = new Loki('1.json') 

            // Load the database if it exists
            dbInstance.loadDatabase({}, () => {
                console.log('Database loaded');
                // create or get collection of documents
                const faces = dbInstance.getCollection<Float32Array>('documents') || dbInstance.addCollection('documents');
                const votes = dbInstance.getCollection<Vote>('votes') || dbInstance.addCollection('votes');
                setDb(dbInstance);
                setFaceCollection(faces)
                setVoteCollection(votes);
            });
           

        } catch (error) {
            console.error('useDB error:', error);
        } 
    }, []);

    const getAllFaces = () => {
        if (!faceCollection) {
            return [];    
        }
        return faceCollection.find();
    };

    const getAllVotes = () => {
        if (!voteCollection) {
            return [];
        }
        return voteCollection.find();
    }

    const addFaces = (face: Float32Array) => {
        if (!db || !faceCollection) {
            throw new Error('No database or collection');
        }
        const response = faceCollection.insert(face);
        db.saveDatabase();
        return response;

    };

    const addVotes = (vote: Vote) => {
        if (!db || !voteCollection) {
            throw new Error('No database or collection');
        }
        const response = voteCollection.insert(vote);
        db.saveDatabase();
        return response;
    };

    const deleteAllFromDB = () => {
        if (!db || !faceCollection || !voteCollection) {
            throw new Error('No database');
        }
        faceCollection.clear();
        voteCollection.clear();
        db.saveDatabase();
        setFaceCollection(null);
        setVoteCollection(null);
    };
    return { getAllFaces, getAllVotes, addFaces, addVotes, deleteAllFromDB };
};

export { useDB };